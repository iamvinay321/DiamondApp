export interface ApiListItem<T> {
    items: Array<T>;
    meta: { from: number, to: number, count: number }
}
