import { IsString } from "@nestjs/class-validator";

export class CreatePlanDto {


  // NO SABESMOS COMO PONER LOS PLANES Y PUSIMOS ESTO DE PRUEBA
  // PENSAMOS EN HACER UN DTO PARA CADA UNO

  @IsString()
  type: string;
}
