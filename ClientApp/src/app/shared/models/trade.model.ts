export interface Trade {
  id: number;
  action: string;
  date: Date;
  quantity: number;
  price: number;
}

export interface Tag {
  id: number;
  name: string;
}

export interface TradeEntry
{
  id: number;
  type: string;
  symbol: string;
  trades: Trade[];
  notes: string;
  tags: Tag[];
}