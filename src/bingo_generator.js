/**
 * ビンゴゲームの抽選結果を生成する
 * @returns {Promise<number[]>} 1～75 までの数字が重複なしでランダムな順序に並んだ配列の Promise
 */
async function generateBingo() {
  return new Promise((resolve, reject) => {
    // タイマーを使って非同期で処理を行う
    const timeout = setTimeout(() => {
      // タイムアウトでreject
      reject(new Error('Timeout: Bingo generation took too long.'));
    }, 1800);

    // ビンゴの数字を生成
    const n = 75;
    const xs = Array.from(Array(n).keys());
    xs[0] = n;
    for (let i = n - 1; i > 0; i--) {
      let r = Math.floor(Math.random() * (i + 1));
      [xs[i], xs[r]] = [xs[r], xs[i]];
    }

    // タイムアウトをクリアしてresolve
    clearTimeout(timeout);
    resolve(xs);
  });
}

// テスト用の呼び出し
generateBingo()
  .then(result => console.log(result))
  .catch(error => console.error(error));