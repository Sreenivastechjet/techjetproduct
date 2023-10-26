export const getQparams = (qParams) => {
    // let qParams =[{page:1},{search:"abi"}]
    let url = "";
  
    if (qParams) {
      let params = qParams;
      let flag = 1;
      params.map((item, index) => {
        if (Object.values(item)[0] !== "") {
          if (flag) {
            flag = 0;
            url += `?${Object.keys(item)}=${Object.values(item)}`;
          } else {
            url += `&${Object.keys(item)}=${Object.values(item)}`;
          }
        }
      });
  
      return url;
      // ?page=1&search=abi"
    }
  };




  export const  upperFirst = (string) =>{
    return string?.charAt(0).toUpperCase() + string?.slice(1);
  }
