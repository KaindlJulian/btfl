import { Host, LiveHost, OfflineHost, Stream, RerunningHost } from '../types';

type dataQuadruple = [string, string, string, string];

/**
 * Transforms data scraped from twitch to internally used Host Objects
 *
 * @param {data array  length = 4} data Expected order is ['stream host name', 'category/game', 'viewer count or "offline"', ('avatar url')]
 * @example ['Gorgc','Dota 2', '4.7K', 'url'] or ['Gorgc','3 new videos', 'Offline', 'url']
 * 
 * @param {boolean} isLive True if the stream is not rerunning or offline
 * @returns {Host} A host object. Either Online, Offline or Rerunning
 */
export function transformToHostObject(data: dataQuadruple, isLive: boolean): Host {
  if (data[2].toLowerCase() === 'offline') {
    const videos =  parseInt(data[1].replace(/(\s?[a-z])*/, ''),10);
    return new OfflineHost(data[0], videos, data[3]);
  } 

  const stream: Stream = {
    game: data[1],
    viewers: data[2],
  }

  if (isLive) {
    return new LiveHost(data[0], stream, data[3]);
  } 

  return new RerunningHost(data[0], stream, data[3]);
}
