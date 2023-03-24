import { Module } from "@nestjs/common";
import { ChatService } from "src/chat/chat.service";
import { ChatGateway } from "src/chat/chat.gateway";

@Module({
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
