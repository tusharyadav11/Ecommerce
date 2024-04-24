class customError extends error{
constructor(message,code){
    super(message);
    this.code = code

}
}

export default customError