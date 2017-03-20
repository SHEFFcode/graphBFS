'use strict';

let graph = {
    root:     { value: 1, adjacentNodes: ['node3', 'node2'] },
    node3:    { value: 3, adjacentNodes: ['root', 'node2'] },
    node2:    { value: 2, adjacentNodes: ['node4'] },
    node4:    { value: 4, adjacentNodes: ['node3', 'node2'] }
};

let que = [];
let cache = {};

function BFS(graphToBfs) {
    function BFSWorkflow(cNode) {
        console.log(cNode.value);
        colorTheNode(cNode);
        queUpAdjacentNodes(cNode);
        
        if (que.length > 0) {
            cNode = que.shift();
            if (cache[graph[cNode].value] === true && que.length > 0) {
                while  (cache[graph[cNode].value] === true && que.length > 0) {
                    cNode = que.shift();
                }
                if (cNode) {
                    BFSWorkflow(graph[cNode]);
                }
            } else if (!cache[graph[cNode].value]) {
                BFSWorkflow(graph[cNode]);
            } 
        } else {
            return;
        }
    }
    function colorTheNode(cNode) {
        cache[cNode.value] = true;
    }
    function queUpAdjacentNodes(cNode) {
        if (cNode.adjacentNodes.length > 0) {
            cNode.adjacentNodes.forEach((adjacentNode) => {
                if (!queHasCurrentNodeAlready(adjacentNode)) {
                    que.push(adjacentNode);
                }
            });
        }
    }

    function queHasCurrentNodeAlready(adjacentNode) {
        var contains = false;

        que.forEach((item)=> {
            if (item == adjacentNode || adjacentNode == 'root' || cache[graph[adjacentNode].value]) {
                contains = true;
            }
        });

        return contains;
    }
    
    BFSWorkflow(graphToBfs.root);
    
}

BFS(graph);