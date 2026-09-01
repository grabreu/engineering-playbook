/** biome-ignore-all lint/suspicious/noExplicitAny: Generic function utilities */

import type { UseMutationOptions } from "@tanstack/react-query";

export type AsyncFnReturnType<T extends (...args: any[]) => Promise<any>> =
  Awaited<ReturnType<T>>;

export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  "queryKey" | "queryFn"
>;

export type MutationConfig<T extends (...args: any[]) => Promise<any>> = Omit<
  UseMutationOptions<AsyncFnReturnType<T>, Error, Parameters<T>[0]>,
  "mutationFn"
>;
