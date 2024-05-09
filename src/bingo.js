// NEW GAMEボタンとNEXT BALLボタンの要素を取得
const newGameButton = document.getElementById('new-game');
const nextBallButton = document.getElementById('next-ball');

// resultをグローバル変数として定義して、generateBingo()の結果を格納する
let result; 

// NEW GAMEボタンのクリックイベントリスナーを設定
newGameButton.addEventListener('click', async () => {
  // すべての表示内容を消す
  clearBoard();

  // NEW GAMEボタン，NEXT BALLボタンを無効化する
  disableButtons();

  // generateBingo関数を呼び出す
  generateBingo()
    .then((data) => {
      result = data
      enableButtons()
    })
    .catch((error) => {
      // エラーが発生した場合、NEW GAMEボタンのみを有効化する
      newGameButton.disabled = false;
    });
});

// NEXT BALLボタンのクリックイベントリスナーを設定
nextBallButton.addEventListener('click', async () => {
  // アニメーションを有効化するチェックボックスの状態を確認
  const shuffleEffectEnabled = document.getElementById('shuffle-effect-enabled').checked;

  // チェックボックスがオンの場合のみアニメーションを実行
  if (shuffleEffectEnabled) {
    // NEXT BALLボタンを無効化
    nextBallButton.disabled = true;

    // アニメーション処理
    const animationInterval = setInterval(() => {
      // 1~75の範囲からランダムな数字を表示
      const randomNumber = Math.floor(Math.random() * 75) + 1;
      displaySelectedNumber(randomNumber, 1);
    }, 100);

    // アニメーション後の処理
    setTimeout(() => {
      // アニメーションを停止
      clearInterval(animationInterval);

      // 約1.6~2秒後に抽選された数字を表示
      const selectedNumber = result.shift();
      displaySelectedNumber(selectedNumber);

      // 75回の抽選が終わったかどうかを確認してボタンを無効化する
      if (result.length === 0) {
        nextBallButton.disabled = true;
      } else {
        // アニメーションが終わった後にNEXT BALLボタンを再び有効化する
        setTimeout(() => {
          nextBallButton.disabled = false;
        }, 200);
      }
    }, 1600 + Math.random() * 400); // 1.6~2秒の間にランダムな時間を追加
  } else {
    // チェックボックスがオフの場合は通常の処理を実行
    try {
      // 配列の先頭の数字を取得して表示する
      const selectedNumber = result.shift();
      displaySelectedNumber(selectedNumber);

      // 75回の抽選が終わったかどうかを確認してボタンを無効化する
      if (result.length === 0) {
        nextBallButton.disabled = true;
      }
    } catch (error) {
      console.error(error);
    }
  }
});

// すべての表示内容を消す関数
function clearBoard() {
  // 抽選済み数字と最新の数字を消す
  document.getElementById('current-ball').innerText = '';
  for (let i = 1; i <= 75; i++) {
    document.getElementById(`ball-${i}`).innerText = '';
  }
}

// NEW GAMEボタンとNEXT BALLボタンを無効化する関数
function disableButtons() {
  newGameButton.disabled = true;
  nextBallButton.disabled = true;
}

// NEW GAMEボタンとNEXT BALLボタンを無効化する関数
function enableButtons() {
  newGameButton.disabled = false;
  nextBallButton.disabled = false;
}

// 抽選済み数字(N)にNを表示する関数
function displaySelectedNumber(number, r=0) {
  // ここで選択された数字を表示する
  if (r==1) {
    document.getElementById(`current-ball`).innerText = number;
  } else {
    document.getElementById(`current-ball`).innerText = number;
    document.getElementById(`ball-${number}`).innerText = number;
  }
}
