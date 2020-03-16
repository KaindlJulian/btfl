export interface Stream {
  /** 
   * Title of the stream
   */
  title?: string;

  /** 
   * Amount of viewers as scraped from twitch.
   * like: `'3.4K'`
   */
  viewers: string;

  /** 
   * Category/Game of the stream
   */
  game: string;
}