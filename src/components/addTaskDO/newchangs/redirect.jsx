import { useSelector } from "react-redux";
import { Redirect, withRouter } from "react-router";
import { compose } from "redux"

function MyRedirect(props) {
    let refRedirect=useSelector(state=>state.TaskDOForm.redirect)
    //console.log(refRedirect)
    //return <>hello</>
    if(refRedirect){
        return <Redirect to={refRedirect} />
    }
    return <></>
}

export default compose(withRouter)(MyRedirect);