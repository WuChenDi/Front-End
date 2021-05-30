import { modules } from "./modules";

type GetGetter<Module> = Module extends { getters: infer G } ? G : unknown;

type GetGetters<Modules> = {
  [K in keyof Modules]: GetGetter<Modules[K]>;
};

type _Getters = GetGetters<typeof modules>;
type AddPrefix<P, K> = `${P & string}/${K & string}`;
type GetSpliceKey<P, Module> = AddPrefix<P, keyof Module>;

type GetSpliceKeys<Modules> = {
  [K in keyof Modules]: GetSpliceKey<K, Modules[K]>;
}[keyof Modules];

// type xx = GetSpliceKeys<_Getters>;

type GetFunc<T, A, B> = T[A & keyof T][B & keyof T[A & keyof T]];

type GetSpliceObj<T> = {
  [K in GetSpliceKeys<T>]: K extends `${infer A}/${infer B}`
    ? GetFunc<T, A, B>
    : unknown;
};

type ModuleGetters = GetSpliceObj<_Getters>;
type Getters = {
  [K in keyof ModuleGetters]: ReturnType<ModuleGetters[K]>;
};

export { Getters };
