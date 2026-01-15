{
  description = "Debtbook - A SvelteKit application";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        nodejs = pkgs.nodejs_20;

        # Build the package
        debtbook = pkgs.buildNpmPackage {
          pname = "debtbook";
          version = "0.0.1";

          src = ./.;

          npmDepsHash = "sha256-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";

          nativeBuildInputs = with pkgs; [
            nodejs
          ];

          # The build phase
          buildPhase = ''
            npm run build
          '';

          # Install the built application
          installPhase = ''
            mkdir -p $out/share/debtbook
            cp -r build/* $out/share/debtbook/
            cp package.json $out/share/debtbook/

            # Copy node_modules for runtime dependencies if needed
            if [ -d "node_modules" ]; then
              cp -r node_modules $out/share/debtbook/
            fi
          '';

          meta = with pkgs.lib; {
            description = "A SvelteKit debt tracking application";
            homepage = "https://github.com/yourusername/svelte-debtbook";
            license = licenses.mit;
            maintainers = [ ];
            platforms = platforms.all;
          };
        };
      in
      {
        packages = {
          default = debtbook;
          debtbook = debtbook;
        };

        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs
            nodePackages.npm
            nodePackages.prettier
            git
          ];

          shellHook = ''
            echo "Debtbook development environment"
            echo "Node.js version: $(node --version)"
            echo "npm version: $(npm --version)"
            echo ""
            echo "Available commands:"
            echo "  npm run dev     - Start development server"
            echo "  npm run build   - Build for production"
            echo "  npm run preview - Preview production build"
            echo "  npm run check   - Type-check the project"
            echo "  npm run lint    - Lint the project"
            echo "  npm run format  - Format code with Prettier"
            echo ""

            # Install dependencies if node_modules doesn't exist
            if [ ! -d "node_modules" ]; then
              echo "node_modules not found. Run 'npm install' to install dependencies."
            fi
          '';

          # Environment variables
          VITE_SUPABASE_URL = builtins.getEnv "VITE_SUPABASE_URL";
          VITE_SUPABASE_ANON_KEY = builtins.getEnv "VITE_SUPABASE_ANON_KEY";
        };

        # Optional: Add a formatter for 'nix fmt'
        formatter = pkgs.nixpkgs-fmt;
      }
    );
}
