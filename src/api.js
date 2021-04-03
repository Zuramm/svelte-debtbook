import { query as q, Client } from "faunadb";
import {
  clone,
  concat,
  filter,
  flow,
  map,
  reduce,
  remove,
} from "lodash/fp";

const client = new Client({
  secret: "fnAEF5wCzfACBeGfblSXbw-ckGCQ2aFz7MTAMNjG",
});

export async function getAllDebts() {
  const res = await client.query(
    q.Call("DebtAllGet")
  );

  return res.data;
}

export async function createDebt(amount, date, description) {
  const res = await client.query(
    q.Call("DebtCreate", amount * 100, date, description)
  );

  return {ref: res.ref, ...res.data};
}

export async function deleteDebt(ref) {
  await client.query(
    q.Call("DebtDelete")
  );
}

export async function updateDebt(ref, amount, date, description) {
  const res = await client.query(
    q.Call("DebtCreate", ref, amount * 100, date, description)
  );

  return {ref, ...res.data};
}

export class DebtbookAPI {
  constructor() {
    this._data = [];
  }

  get data() {
    return clone(this._data);
  }

  [Symbol.iterator]() {
    return this._data.values();
  }

  async get() {
    const res = await client.query(
      q.Call("DebtAllGet")
    );

    this._data = map((debt) => new DebtAPI(debt))(res.data);
  }

  sum() {
    const now = new Date().toISOString().substring(0, "YYYY-MM-DD".length);
    return flow(
      filter((debt) => debt.date <= now),
      reduce((acc, debt) => acc + debt.amount, 0)
    )(this._data);
  }

  async create({ amount = 0, date, description = "" }) {
    const res = await client.query(
      q.Call("DebtCreate", amount * 100, date, description)
    );

    const debt = new DebtAPI(res);

    this._data = concat(debt)(this._data);
  }

  async update(debt, data) {
    await debt.update(data);
  }

  async delete(debt) {
    await debt.delete();

    remove(debt)(this._data);
  }

  async fromJSON(json) {
    await client.query(
      q.Call("JSONImport", json)
    );

    console.log(json);
  }

  toJSON() {
    return map((debt) => [debt.amount, debt.date, debt.description])(
      this._data
    );
  }
}

export class DebtAPI {
  constructor(debt) {
    this.ref = debt.ref;
    this.from(debt);
  }

  from(debt) {
    this.amount = debt.data.amount / 100;
    this.date = debt.data.date.value.substring(0, "YYYY-MM-DD".length);
    this.description = debt.data.description;
  }

  async update({
    amount = this.amount,
    date = this.date,
    description = this.description,
  }) {
    const res = await client.query(
      q.Call("DebtUpdate", this.ref, amount * 100, date, description)
    );

    this.from(res);
  }

  async delete() {
    return client.query(
      q.Call("DebtDelete", this.ref)
    );
  }
}
