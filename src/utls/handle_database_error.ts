import { BadRequestException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { EntityNotFoundError, QueryFailedError, TypeORMError } from "typeorm";


export function handleDatabaseError(error: Error, message: string) {
  if (error instanceof QueryFailedError) {
    // Handles SQL constraint violations, syntax errors, etc.
    throw new InternalServerErrorException(`${message}: ${error.message}`);
  } else if (error instanceof EntityNotFoundError) {
    // Handles cases where an entity is not found in the database
    throw new NotFoundException(`${message}: Entity not found`);
  } else if (error instanceof TypeORMError) {
    // Catches any other TypeORM-specific errors
    throw new InternalServerErrorException(`${message}: Database error`);
  } else if (error instanceof NotFoundException) {
    // Re-throw if it's a NotFoundException, since it's already handled
    throw error;
  } else if (error instanceof BadRequestException) {
    // Catches bad request exceptions (e.g., invalid input)
    throw error;
  } else {
    // Handle any other unknown errors
    throw new InternalServerErrorException(
      `${message}: Unexpected server error`,
    );
  }
}