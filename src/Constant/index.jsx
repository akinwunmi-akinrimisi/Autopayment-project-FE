import FlexiscrowAbi from "../ABI/Flexiscrow.json";
import MultisigAbi from "../ABI/Multisig.json";
import LiskTokenAbi from "../ABI/LiskToken.json";
import { Abi } from "../ABI/Escrow";

export const FlexiscrowContract = {
    address: "0x3928F62ccfd6CBE605a9630ab4a7f40fdE743F65",
    abi: FlexiscrowAbi,
  };

  export const EscrowContract = {
    address: "0xa07E34f8d4e00e33c7A2bbad2FcEB474BeceCd0E",
    abi: Abi,
  };

  export const MultisigContract = {
    address: "0x2140eF2532a4CB0f1A2399B673F374b7f6289481",
    abi: MultisigAbi,
  };
  export const LiskTokenContract = {
    address: "0xb592fcedC173B15203F03142E4e7584530B45759",
    abi: LiskTokenAbi,
  };