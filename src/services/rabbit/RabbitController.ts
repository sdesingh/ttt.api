import { Request, Response } from 'express';
import amqp, { Connection, Channel, Replies, ConsumeMessage } from 'amqplib';

  

let channel : Channel;
let assertQueue : Replies.AssertQueue;

export function initializeRabbitConnection() {

  amqp.connect("amqp://localhost", 
  
    async (err: any, connection: Connection) => {
      
      if(err){
        console.log('An error has occurred while connecting to rabbit.');
      }
      else {
        channel = await connection.createChannel();

        channel.assertExchange('hw4', 'direct', { durable: false });
        assertQueue = await channel.assertQueue('', { exclusive: true });
      }

    }
  );

}

function createdChannel(channel : Channel) {

  channel.consume(assertQueue.queue, 
    
    (msg) => {


    },
    {
      noAck: true
    }
  )
}

export async function listen(keys: string[], callback: Function){

  keys.forEach(

    (key, i) => {
      channel.bindQueue(assertQueue.queue, 'hw4', key);
    }
  )

  channel.consume(assertQueue.queue, 
    (msg: ConsumeMessage|null) => {
      if(msg != null){
        callback(msg.content.toString());
      }
    }
  )



}

export function speak(key: string, msg: string){
  channel.publish('hw4', key, Buffer.from(msg));
}