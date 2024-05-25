export interface HttAdapter {
  // return something of type T
  get<T>(url: string): Promise<T>;
}
