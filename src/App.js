import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router';
import AddTaskDoStart from './components/addTaskDO/addTaskDoStart'
import { useSelector, useDispatch } from 'react-redux';
import { getRights } from './redux/reducers/reducer_taskDO'
import React from 'react';
import { Switch } from 'react-router-dom';
import { CompareDataVGOSwitch } from './components/CompareDataVgo/index'

function App() {
  let rights = useSelector(state => state.TaskDOForm.rights)
  let dispatch = useDispatch()
  React.useEffect(() => dispatch(getRights()), [])

  //console.log('rights',rights)

  return (
    <div className="App">
      {rights && <Switch>
        <Route path="/react/AddTaskDO" render={() => <AddTaskDoStart />} />
        <Route path="/react/VGO/:gid?/:idTask?" render={() => <CompareDataVGOSwitch />} />
      </Switch>
      }
      {!rights && <Route path="/react/AddTaskDO" render={() => <AlertWorcing />} />}
    </div>
  );
}

export default App;

function AlertWorcing() {
  return (
    <div className="alert alert-danger m-2" role="alert">
      <h4 className="alert-heading">Ведутся работы!</h4>
      <p></p>
      <hr />
      <p className="mb-0">Приносим извинения за предоставленные неудобства, скоро работа сервиса будет восстановлена.</p>
    </div>
  )
}
