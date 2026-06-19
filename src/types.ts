export interface Project {
  id: string;
  title: string;
  category: string;
  color: string;
  link: string;
}

export interface Stat {
  num: number;
  label: string;
  suffix?: string;
}
