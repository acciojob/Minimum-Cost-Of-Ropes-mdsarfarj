function calculateMinCost() {
  // Get the input string containing comma-separated rope lengths
  const inputString = document.getElementById('rope-lengths').value;

  // Function to convert the input string to an array of integers
  function parseInput(inputString) {
    return inputString.split(',').map(item => parseInt(item.trim(), 10));
  }

  // Function to calculate the minimum cost of connecting ropes
  function minCostOfRopes(ropes) {
    // Create a min-heap (priority queue)
    const minHeap = new MinHeap();

    // Add all rope lengths to the min-heap
    ropes.forEach(length => minHeap.insert(length));

    let totalCost = 0;
    // While there is more than one rope in the heap
    while (minHeap.size() > 1) {
      // Extract the two minimum ropes from the heap
      const min1 = minHeap.extractMin();
      const min2 = minHeap.extractMin();

      // Calculate the cost of combining the two ropes
      const combinedCost = min1 + min2;

      // Add the cost to the total cost
      totalCost += combinedCost;

      // Add the combined rope back to the heap
      minHeap.insert(combinedCost);
    }

    return totalCost;
  }

  // Define the MinHeap class for the priority queue
  class MinHeap {
    constructor() {
      this.heap = [];
    }

    insert(value) {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    }

    extractMin() {
      const min = this.heap[0];
      const end = this.heap.pop();
      if (this.heap.length > 0) {
        this.heap[0] = end;
        this.sinkDown(0);
      }
      return min;
    }

    size() {
      return this.heap.length;
    }

    bubbleUp(index) {
      const element = this.heap[index];
      while (index > 0) {
        const parentIndex = Math.floor((index - 1) / 2);
        const parent = this.heap[parentIndex];
        if (element >= parent) break;
        this.heap[parentIndex] = element;
        this.heap[index] = parent;
        index = parentIndex;
      }
    }

    sinkDown(index) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;
      const length = this.heap.length;
      if (left < length && this.heap[left] < this.heap[smallest]) {
        smallest = left;
      }
      if (right < length && this.heap[right] < this.heap[smallest]) {
        smallest = right;
      }
      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [this.heap[smallest], this.heap[index]];
        this.sinkDown(smallest);
      }
    }
  }

  // Parse the input string to an array of integers
  const ropes = parseInput(inputString);

  // Calculate the minimum cost of connecting ropes
  const minCost = minCostOfRopes(ropes);

  // Display the minimum cost in the "result" div element
  document.getElementById('result').innerText = minCost;
}
