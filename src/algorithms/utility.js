// Backtracks from the finish node to find the shortest path.
const getNodesInShortestPathOrder = finishNode => {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode.onShortestPath = true;
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

export default getNodesInShortestPathOrder;
