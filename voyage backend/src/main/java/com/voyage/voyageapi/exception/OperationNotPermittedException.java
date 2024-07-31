package com.voyage.voyageapi.exception;

public class OperationNotPermittedException extends RuntimeException{

    public OperationNotPermittedException() {
    }

    public OperationNotPermittedException(String message) {
        super(message);
    }
}
