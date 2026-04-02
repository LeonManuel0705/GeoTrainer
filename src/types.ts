export interface Card {
  id: string | number;
  filename: string;
  country: string;
  region?: string;
  hint?: string;
}

export interface QuizQuestion {
  card_id: string | number;
  filename: string;
  options: string[];
}

export interface Lesson {
  id: string | number;
  title: string;
  category: string;
  description?: string;
}

export interface Stats {
  total_cards: number;
  cards_due: number;
  accuracy: number;
  streak: number;
}
