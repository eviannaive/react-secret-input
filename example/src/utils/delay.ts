/**
 * 延遲執行的工具函式
 *
 * - 會回傳一個 Promise，搭配 `await` 使用即可實現「暫停」效果
 * - 常用於等待動畫完成、模擬 API 延遲、或需要短暫停頓的情境
 *
 * @param time 延遲的時間（毫秒）
 * @returns Promise，在指定時間後 resolve
 *
 * @example
 * await delay(1000); // 等待 1 秒
 */
export const delay = (time: number) => {
  return new Promise((res) => setTimeout(res, time));
};
