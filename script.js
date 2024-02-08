// 돈을 매개변수로 받으면 몇개의 지폐와 동전이 필요한지 최소한의 개수로 반환하는 함수를 작성하세요.

// 예를 들어 3250원을 받으면 1000원 3장, 100원 2개, 50원 1개를 반환해야 합니다.

// 지폐는 50000, 10000, 5000, 1000원, 동전은 500, 100원이 있습니다.

// 반환값은 배열이며, 각 요소는 지폐 또는 동전의 금액과 개수를 나타내는 객체입니다.

// 반환값 예시

function calculateChange(money) {
  const changes = [
    { money: 50000, count: 0 },
    { money: 10000, count: 0 },
    { money: 5000, count: 0 },
    { money: 1000, count: 0 },
    { money: 500, count: 0 },
    { money: 100, count: 0 },
  ];

  for (let i = 0; i < changes.length; i++) {
    changes[i].count = Math.floor(money / changes[i].money);
    money %= changes[i].money;
  }

  return changes.filter((change) => change.count !== 0);
}
