export class UpdateRolDto {
  public idRol?: number;
  public administrador?: boolean;
  public usuario?: boolean;
  public medico?: boolean;
}

export type PartialUpdateUsuarioDto = Partial<UpdateRolDto>;
