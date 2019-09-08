export default bigMario;

function bigMario (phoneCall:any):string {
  try {
    let order:string;
    const conversation = JSON.parse(phoneCall);

    if (!conversation.x || !conversation.x.hash) {
        throw new Error("Wrong number!");
    } else {
      order = conversation.x.hash;
    }

    return order;
  } catch (err) {
    throw new Error("Big Mario forgot supply the stockroom!");
  }
}
