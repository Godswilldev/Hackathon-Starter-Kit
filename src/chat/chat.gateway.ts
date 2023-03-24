import { ChatService } from "src/chat/chat.service";
import { CreateChatDto } from "src/chat/dto/create-chat.dto";
import { UpdateChatDto } from "src/chat/dto/update-chat.dto";
import { WebSocketGateway, SubscribeMessage, MessageBody } from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage("createChat")
  create(@MessageBody() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }

  @SubscribeMessage("findAllChat")
  findAll() {
    return this.chatService.findAll();
  }

  @SubscribeMessage("findOneChat")
  findOne(@MessageBody() id: number) {
    return this.chatService.findOne(id);
  }

  @SubscribeMessage("updateChat")
  update(@MessageBody() updateChatDto: UpdateChatDto) {
    return this.chatService.update(updateChatDto.id, updateChatDto);
  }

  @SubscribeMessage("removeChat")
  remove(@MessageBody() id: number) {
    return this.chatService.remove(id);
  }
}
