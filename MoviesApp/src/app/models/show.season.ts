import { Episode } from "./show.episode";

export interface ShowSeason {
    Title: string;
    Season: number;
    totalSeasons: number;
    Episodes: Episode[];
}