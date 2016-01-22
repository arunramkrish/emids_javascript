onmessage = function(e) {
  console.log('Message received from main script' + e.data);
  var workerResult = 'Result from worker thread';
  console.log('Posting message back to main script');
  postMessage(workerResult);
}