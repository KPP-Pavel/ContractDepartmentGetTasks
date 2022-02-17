import NavTask from "./navTask";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { compose } from "redux";

let mapStateToProps = (state) => {
    //debugger;
    return {
    }
}


let navTaskContainer = compose(connect(mapStateToProps,{}),withRouter)(NavTask);
export default navTaskContainer