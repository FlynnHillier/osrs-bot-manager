export type ExcludeMethods<T> = Pick<T, { [K in keyof T]: T[K] extends (_: any) => any ? never : K }[keyof T]>

export type Mutable<T> = { -readonly [p in keyof T] : T[p]}

//destructing objects to their properties
export type Explode<T> = keyof T extends infer K
  ? K extends unknown
  ? { [I in keyof T]: I extends K ? T[I] : never }
  : never
  : never;
export type AtMostOnePropertyOf<T> = Explode<Partial<T>>;
export type AtLeastOnePropertyOf<T, U = {[K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U]
export type ExactlyOnePropertyOf<T> = AtMostOnePropertyOf<T> & AtLeastOnePropertyOf<T>