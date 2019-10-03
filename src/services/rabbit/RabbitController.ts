import amqp, { Connection, Channel, Replies, ConsumeMessage } from 'amqplib';


  

export async function connectChannel(callback: Function) {


  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();
  channel.assertExchange('hw4', 'direct', { durable: true });
  const assertQueue = await channel.assertQueue('', { exclusive: true });
  callback(channel, assertQueue);

}

export async function listen(keys: string[], callback: Function){
  connectChannel(
    (channel: Channel, queue : Replies.AssertQueue) => {
      keys.forEach(

        (key, i) => {
          channel.bindQueue(queue.queue, 'hw4', key);
        }
      )
    
      channel.consume(queue.queue, 
        (msg: ConsumeMessage|null) => {
          if(msg != null){
            callback(msg.content.toString());
            channel.cancel(queue.queue);
            
          }
        },
        {
          noAck: true
        }
      )
    }
  );


}

export async function speak(key: string, msg: string){


  connectChannel(

    (channel: Channel, queue : Replies.AssertQueue) => {

      channel.publish('hw4', key, Buffer.from(msg));

    }

  );

}