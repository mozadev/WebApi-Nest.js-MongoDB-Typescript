export interface HttpAdapter {
  // return something of type T  (adaptador adapter)
  get<T>(url: string): Promise<T>;
}
