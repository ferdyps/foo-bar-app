function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

const results = [];

for (let i = 100; i > 0; i--) {
    if (isPrime(i)) continue;

    if (i % 15 === 0) {
        results.push("FooBar");
    } else if (i % 3 === 0) {
        results.push("Foo");
    } else if (i % 5 === 0) {
        results.push("Bar");
    } else {
        results.push(i);
    }
}

console.log(results.join(" "));
