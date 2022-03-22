// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("signerId", Value.fromString(""));
    this.set("swap", Value.fromStringArray(new Array(0)));
    this.set("liquidity", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Account entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Account must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Account", id.toString(), this);
    }
  }

  static load(id: string): Account | null {
    return changetype<Account | null>(store.get("Account", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get signerId(): string {
    let value = this.get("signerId");
    return value!.toString();
  }

  set signerId(value: string) {
    this.set("signerId", Value.fromString(value));
  }

  get blockTimestamp(): BigInt | null {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt | null) {
    if (!value) {
      this.unset("blockTimestamp");
    } else {
      this.set("blockTimestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get swap(): Array<string> {
    let value = this.get("swap");
    return value!.toStringArray();
  }

  set swap(value: Array<string>) {
    this.set("swap", Value.fromStringArray(value));
  }

  get liquidity(): Array<string> {
    let value = this.get("liquidity");
    return value!.toStringArray();
  }

  set liquidity(value: Array<string>) {
    this.set("liquidity", Value.fromStringArray(value));
  }
}

export class Swap extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Swap entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Swap must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Swap", id.toString(), this);
    }
  }

  static load(id: string): Swap | null {
    return changetype<Swap | null>(store.get("Swap", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get output(): string | null {
    let value = this.get("output");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set output(value: string | null) {
    if (!value) {
      this.unset("output");
    } else {
      this.set("output", Value.fromString(<string>value));
    }
  }

  get poolId(): BigInt | null {
    let value = this.get("poolId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set poolId(value: BigInt | null) {
    if (!value) {
      this.unset("poolId");
    } else {
      this.set("poolId", Value.fromBigInt(<BigInt>value));
    }
  }

  get blockTimestamp(): BigInt | null {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt | null) {
    if (!value) {
      this.unset("blockTimestamp");
    } else {
      this.set("blockTimestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get tokenInAmount(): BigInt | null {
    let value = this.get("tokenInAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set tokenInAmount(value: BigInt | null) {
    if (!value) {
      this.unset("tokenInAmount");
    } else {
      this.set("tokenInAmount", Value.fromBigInt(<BigInt>value));
    }
  }

  get tokenIn(): string | null {
    let value = this.get("tokenIn");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenIn(value: string | null) {
    if (!value) {
      this.unset("tokenIn");
    } else {
      this.set("tokenIn", Value.fromString(<string>value));
    }
  }

  get tokenOutAmount(): BigInt | null {
    let value = this.get("tokenOutAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set tokenOutAmount(value: BigInt | null) {
    if (!value) {
      this.unset("tokenOutAmount");
    } else {
      this.set("tokenOutAmount", Value.fromBigInt(<BigInt>value));
    }
  }

  get tokenOut(): string | null {
    let value = this.get("tokenOut");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenOut(value: string | null) {
    if (!value) {
      this.unset("tokenOut");
    } else {
      this.set("tokenOut", Value.fromString(<string>value));
    }
  }

  get receiptId(): string | null {
    let value = this.get("receiptId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set receiptId(value: string | null) {
    if (!value) {
      this.unset("receiptId");
    } else {
      this.set("receiptId", Value.fromString(<string>value));
    }
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));

    this.set("swapsFirst", Value.fromStringArray(new Array(0)));
    this.set("swaps24First", Value.fromStringArray(new Array(0)));
    this.set("swapsSecond", Value.fromStringArray(new Array(0)));
    this.set("swaps24Second", Value.fromStringArray(new Array(0)));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get tokenFirst(): string | null {
    let value = this.get("tokenFirst");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenFirst(value: string | null) {
    if (!value) {
      this.unset("tokenFirst");
    } else {
      this.set("tokenFirst", Value.fromString(<string>value));
    }
  }

  get tokenSecond(): string | null {
    let value = this.get("tokenSecond");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set tokenSecond(value: string | null) {
    if (!value) {
      this.unset("tokenSecond");
    } else {
      this.set("tokenSecond", Value.fromString(<string>value));
    }
  }

  get swapsFirst(): Array<string> {
    let value = this.get("swapsFirst");
    return value!.toStringArray();
  }

  set swapsFirst(value: Array<string>) {
    this.set("swapsFirst", Value.fromStringArray(value));
  }

  get swaps24First(): Array<string> {
    let value = this.get("swaps24First");
    return value!.toStringArray();
  }

  set swaps24First(value: Array<string>) {
    this.set("swaps24First", Value.fromStringArray(value));
  }

  get swapsSecond(): Array<string> {
    let value = this.get("swapsSecond");
    return value!.toStringArray();
  }

  set swapsSecond(value: Array<string>) {
    this.set("swapsSecond", Value.fromStringArray(value));
  }

  get swaps24Second(): Array<string> {
    let value = this.get("swaps24Second");
    return value!.toStringArray();
  }

  set swaps24Second(value: Array<string>) {
    this.set("swaps24Second", Value.fromStringArray(value));
  }

  get firstTokenVolume(): BigInt | null {
    let value = this.get("firstTokenVolume");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set firstTokenVolume(value: BigInt | null) {
    if (!value) {
      this.unset("firstTokenVolume");
    } else {
      this.set("firstTokenVolume", Value.fromBigInt(<BigInt>value));
    }
  }

  get secondTokenVolume(): BigInt | null {
    let value = this.get("secondTokenVolume");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set secondTokenVolume(value: BigInt | null) {
    if (!value) {
      this.unset("secondTokenVolume");
    } else {
      this.set("secondTokenVolume", Value.fromBigInt(<BigInt>value));
    }
  }

  get fee(): string | null {
    let value = this.get("fee");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set fee(value: string | null) {
    if (!value) {
      this.unset("fee");
    } else {
      this.set("fee", Value.fromString(<string>value));
    }
  }

  get poolId(): string | null {
    let value = this.get("poolId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set poolId(value: string | null) {
    if (!value) {
      this.unset("poolId");
    } else {
      this.set("poolId", Value.fromString(<string>value));
    }
  }

  get receiptId(): string | null {
    let value = this.get("receiptId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set receiptId(value: string | null) {
    if (!value) {
      this.unset("receiptId");
    } else {
      this.set("receiptId", Value.fromString(<string>value));
    }
  }
}

export class AddLiquidity extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save AddLiquidity entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type AddLiquidity must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("AddLiquidity", id.toString(), this);
    }
  }

  static load(id: string): AddLiquidity | null {
    return changetype<AddLiquidity | null>(store.get("AddLiquidity", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get output(): string | null {
    let value = this.get("output");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set output(value: string | null) {
    if (!value) {
      this.unset("output");
    } else {
      this.set("output", Value.fromString(<string>value));
    }
  }

  get receiptId(): string | null {
    let value = this.get("receiptId");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set receiptId(value: string | null) {
    if (!value) {
      this.unset("receiptId");
    } else {
      this.set("receiptId", Value.fromString(<string>value));
    }
  }

  get blockTimestamp(): BigInt | null {
    let value = this.get("blockTimestamp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set blockTimestamp(value: BigInt | null) {
    if (!value) {
      this.unset("blockTimestamp");
    } else {
      this.set("blockTimestamp", Value.fromBigInt(<BigInt>value));
    }
  }

  get functionCalled(): string | null {
    let value = this.get("functionCalled");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set functionCalled(value: string | null) {
    if (!value) {
      this.unset("functionCalled");
    } else {
      this.set("functionCalled", Value.fromString(<string>value));
    }
  }

  get functionAction(): string | null {
    let value = this.get("functionAction");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set functionAction(value: string | null) {
    if (!value) {
      this.unset("functionAction");
    } else {
      this.set("functionAction", Value.fromString(<string>value));
    }
  }

  get firstPoolAmount(): BigInt | null {
    let value = this.get("firstPoolAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set firstPoolAmount(value: BigInt | null) {
    if (!value) {
      this.unset("firstPoolAmount");
    } else {
      this.set("firstPoolAmount", Value.fromBigInt(<BigInt>value));
    }
  }

  get firstPool(): string | null {
    let value = this.get("firstPool");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set firstPool(value: string | null) {
    if (!value) {
      this.unset("firstPool");
    } else {
      this.set("firstPool", Value.fromString(<string>value));
    }
  }

  get secondPoolAmount(): BigInt | null {
    let value = this.get("secondPoolAmount");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set secondPoolAmount(value: BigInt | null) {
    if (!value) {
      this.unset("secondPoolAmount");
    } else {
      this.set("secondPoolAmount", Value.fromBigInt(<BigInt>value));
    }
  }

  get secondPool(): string | null {
    let value = this.get("secondPool");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set secondPool(value: string | null) {
    if (!value) {
      this.unset("secondPool");
    } else {
      this.set("secondPool", Value.fromString(<string>value));
    }
  }

  get sharesMinted(): BigInt | null {
    let value = this.get("sharesMinted");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set sharesMinted(value: BigInt | null) {
    if (!value) {
      this.unset("sharesMinted");
    } else {
      this.set("sharesMinted", Value.fromBigInt(<BigInt>value));
    }
  }
}
