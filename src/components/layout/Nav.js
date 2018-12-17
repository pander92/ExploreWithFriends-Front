import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { axiosPost, axiosPut } from "../../utils/axios";
import {
  logoutUser,
  clearCurrentProfile,
  updateUserLoc,
  getAllUsers,
  getAllTeams,
  joinTeam,
  getUserDB,
  getTeam,
  addUser,
  removeUser,
  loginUser,
  setCurrentUser
} from "../../actions";
import {
  Button,
  SideSheet,
  Paragraph,
  Pane,
  Heading,
  Card,
  Position,
  Popover,
  Text,
  TextInput,
  SelectMenu,
  Checkbox,
  Menu,
  Dialog
} from "evergreen-ui";

class Nav extends Component {
  state = {
    isShown: false,
    selected: false,
    updatedShown: false,
    updated: "success",
    dropDownOptions: ["Dude1", "Dude2", "Dude3"].map(label => ({
      label,
      value: label
    })),
    dropDownSelected: [],
    selectedTeam: false,
    joinedTeam: "",
    newDropDownSelected: "",
    selectedUserObject: {
      userScore: 0,
      currentPosition: { name: "", position: ["0", "0"] }
    },
    selectedUserId: "",
    selectedUserName: "",
    selectedTeamObject: {
      teamScore: 0,
      challenge1: { name: "" },
      challenge2: { name: "" },
      challenge3: { name: "" }
    },
    selectedTeamId: "",
    selectedTeamName: "",
    selectedTeamUsers: [],
    selectedTeammateObject: {
      userScore: 0,
      currentPosition: { name: "", position: ["0", "0"] }
    },
    selectedTeammateId: "",
    selectedTeammateName: "",
    teamDialogInfoIsShown: false,
    teammateDialogInfoIsShown: false,
    userDialogInfoIsShown: false,
    teamName: "",
    teammateMenuSelected: ""
    //teammateDropdownSelected: []
    //teamDropdownSelectedTeam: null,
    //teamDropdownSelectedTeamObject: {}
  };

  onLogoutClick = e => {
    e.preventDefault();

    this.props.clearCurrentProfile();
    this.props.logoutUser();

    window.location.href = "http://localhost:3000/users/login";
  };

  onUpdateDB = e => {
    e.preventDefault();
    //plug in values
    const currentLocation = [
      this.props.map.currentLocation.lat,
      this.props.map.currentLocation.lng
    ];
    const data = {
      id: this.props.auth.user.id,
      locationToUpdate: currentLocation
    };
    this.props.updateUserLoc(data);
  };

  handleRemoveTeammate = () => {
    let data = {};
    data.team = this.state.selectedTeammateObject.team;
    data.user = this.state.selectedTeammateObject._id;
    axiosPut("/edit/removeuser", data)
      .then(data => {
        console.log("REMOVED USER, ", data);
      })
      .catch(error => {
        console.log("RemoveUser Error: ", error);
      });

    this.setState({
      selectedTeammateObject: {},
      selectedTeammateId: "",
      selectedTeammateName: ""
    });

    this.props.getAllUsers();
    this.props.getAllTeams();
    this.props.getUserDB(this.props.auth.user.id);
  };

  toggleSuccess = () => {
    this.setState(
      {
        updatedShown: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            updatedShown: false
          });
        }, 2000);
      }
    );
  };

  joinTeamClick = () => {
    let data = {};
    //data.teamName = this.state.joinedTeam;
    data.team = this.state.selectedTeamId;
    data.user = this.props.auth.user.id;

    this.props.joinTeam(data);

    this.props.getAllUsers();
    this.props.getAllTeams();
    this.props.getUserDB(this.props.auth.user.id);
  };

  bringUserToTeam = () => {
    let data = {};
    data.team = this.props.auth.user.teamData._id;
    data.user = this.state.selectedUserId;
    this.setState({
      selectedUserObject: {userScore:0},
      selectedUserId: "",
      selectedUserName: ""
    });
    this.props.joinTeam(data);
    this.props.getAllUsers();
    this.props.getAllTeams();
    this.props.getUserDB(this.props.auth.user.id);
  };

  onTeammatesDropDownSelected = e => {
    if (e.target.value == "default") {
      this.setState({
        selectedTeammateObject: {
          userScore: 0,
          currentPosition: { name: "", position: ["0", "0"] }
        },
        selectedTeammateId: "",
        selectedTeammateName: ""
      });
    }
    if (e.target.value !== "default") {
      let obj = JSON.parse(e.target.value);
      console.log("Teammate Object-----", obj);

      this.setState({
        selectedTeammateObject: obj,
        selectedTeammateId: obj._id,
        selectedTeammateName: obj.username
      });
    }
  };

  onTeamDropDownSelected = e => {
    if (e.target.value == "default") {
      this.setState({
        selectedTeamObject: {
          teamScore: 0,
          challenge1: { name: "" },
          challenge2: { name: "" },
          challenge3: { name: "" }
        },
        selectedTeamId: null,
        selectedTeamName: null,
        selectedTeamUsers: null
      });
    }
    if (e.target.value !== "default") {
      let obj = JSON.parse(e.target.value);
      console.log("TEAM OBJECT: ", obj);
      console.log("Challenge Name: ", obj.challenge1.name);
      this.setState({
        selectedTeamObject: obj,
        selectedTeamId: obj._id,
        selectedTeamName: obj.teamName,
        selectedTeamUsers: obj.users
      });
      console.log("Challenge Name2: ", this.state.selectedTeamObject);
    }
  };

  onUserDropDownSelected = e => {
    if (e.target.value == "default") {
      this.setState({
        selectedUserObject: {},
        selectedUserId: "",
        selectedUserName: ""
      });
    }

    if (e.target.value !== "default") {
      let obj = JSON.parse(e.target.value);
      this.setState({
        selectedUserObject: obj,
        selectedUserId: obj._id,
        selectedUserName: obj.username
      });
    }
  };

  componentDidUpdate(prevProps) {
    //console.log("prevProps: ", prevProps);
    //console.log("This.props: ", this.props);

    if (prevProps.user.user !== this.props.user.user) {
      console.log("inside component did update 'if' statement");
      this.toggleSuccess();
    }
    //console.log(Object.keys(prevProps.userDB).length);
    // if (Object.keys(prevProps.userDB).length === 1) {
    //   //console.log(prevProps.userDB.userData.team.teamName);
    //   this.setState({
    //     teamName: prevProps.userDB.userData.team.teamName
    //   });
    // }
  }

  componentDidMount() {
    this.props.getAllUsers();
    this.props.getAllTeams();
    if (this.props.auth.isAuthenticated) {
      this.props.getUserDB(this.props.auth.user.id);
    }
  }

  render() {
    // if (this.props.auth.isAuthenticated == true) {
    //   this.props.getTeam(this.props.auth.user.userData.team._id);
    // }

    const { isAuthenticated, user } = this.props.auth;

    //const currentTeam = <span>{this.props.userDB.userData.team.teamName}</span>;

    const userLoggedIn = (
      <ul>
        <li>
          <Link to="#">
            <Button
              appearance="primary"
              onClick={() => this.setState({ isShown: true })}>
              {user.username}
            </Button>
          </Link>
        </li>
        <li>
          <a href="" onClick={this.onLogoutClick}>
            Logout
          </a>
        </li>
      </ul>
    );

    const logInOrRegister = (
      <ul>
        <li>
          <Link to="/users/register">Register</Link>
          <Link to="/users/login">Login</Link>
        </li>
      </ul>
    );

    // let showTeams = this.props.allTeams.allTeams
    //   ? this.props.allTeams.allTeams.map(item => {
    //       return <span>{item}</span>;
    //     })
    //   : 'Fcuk';
    //console.log(showTeams)
    //console.log('--------');
    //console.log(this.props.userDB.userData);

    // if (this.props.userDB.userData.team.teamName.length > 1) {
    //   teamName = this.props.userDB.userData.team.teamName;
    // } else {
    //   teamName = '';
    // }
    ////////////////////////////////////////////////////////
    // let teamName;

    // if (this.props.userDB.userData !== null) {
    //   teamName = this.props.userDB.userData.team.teamName;
    // } else {
    //   teamName = '';
    // }

    // if (this.props.userDB.userData === null) {
    //   teamName = localStorage.getItem('user');
    //   console.log(JSON.stringify(localStorage.getItem('user')));
    //   console.log(teamName);
    // }
    ////////////////////////////////////////////////////////

    return (
      <React.Fragment>
        <SideSheet
          position={Position.TOP}
          isShown={this.state.isShown}
          onCloseComplete={() => this.setState({ isShown: false })}
          containerProps={{
            display: "flex",
            flex: "1",
            flexDirection: "column"
          }}>
          <Pane zIndex={1} flexShrink={0} elevation={0} display="flex">
            <Pane
              padding={16}
              borderBottom="muted"
              backgroundColor="#f3f6f2"
              elevation={3}>
              <Heading size={600}>
                Information for {"<"} {user.username} {">"}
              </Heading>
              <Paragraph size={400} color="muted">
                {/* <strong>CurrentTeam</strong>
                <br />
                {this.props.auth.isAuthenticated &&
                this.props.auth.user.teamData !== null
                  ? this.props.auth.user.teamData.teamName
                  : "No Team"} */}
                <br />
                <img
                  style={{ width: 100, height: 100 }}
                  src="/images/anon.png"
                />
                <br />
                <strong>Current Team</strong>
                <br />
                {this.props.auth.isAuthenticated &&
                  this.props.auth.user.teamData !== null &&
                  this.props.userDB.userData !== null &&
                  this.props.userDB.userData.teamData !== undefined
                  ? this.props.userDB.userData.teamData.teamName
                  : "No Team Data"}
                <br />
                <strong>CurrentLocation</strong>
                <br />
                Latitude: {this.props.map.currentLocation.lat}
                <br />
                Longitude: {this.props.map.currentLocation.lng}
              </Paragraph>
              <Button onClick={this.onUpdateDB} appearance="primary">
                Update DB
              </Button>

              <Popover
                content={
                  <Pane
                    width={240}
                    height={240}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    flexDirection="column">
                    <Text>Manually Insert Location</Text>
                    Latitude
                    <TextInput autoFocus width="90%" />
                    Longitude
                    <TextInput width="90%" />
                    <Button>
                      <Text>Update DB</Text>
                    </Button>
                  </Pane>
                }>
                <Button>
                  <Text>Manual Input</Text>
                </Button>
              </Popover>

              <br />
              <span>{this.state.updatedShown ? this.state.updated : ""}</span>
            </Pane>
            <Pane display="flex" justifyContent={"space-evenly"}>
              <Pane
                marginRight={10}
                marginLeft={10}
                elevation={2}
                paddingLeft={10}
                paddingRight={10}
                flexGrow={1}>
                <Text>
                  <strong>Teammate Pane</strong>
                </Text>
                <br />
                <select onChange={this.onTeammatesDropDownSelected}>
                  <option value="default">Select Teammates:</option>
                  {this.props.auth.isAuthenticated == true &&
                    this.props.auth.user.teamData !== undefined &&
                    this.props.userDB.userData !== null
                    ? this.props.userDB.userData.teamData.users.map(
                      (item, index) => (
                        <option key={index} value={JSON.stringify(item)}>
                          {item.username}
                        </option>
                      )
                    )
                    : "No Teammates...sorry bro"}
                </select>
                <br />
                <Button
                  onClick={this.handleRemoveTeammate}
                  disabled={
                    this.state.selectedTeammateName !== "" ? false : true
                  }
                  appearance="primary"
                  intent="danger">
                  Remove Teammate
                </Button>

                <Dialog
                  isShown={this.state.teammateDialogInfoIsShown}
                  title={
                    <div>
                      <Heading>{this.state.selectedTeammateName}</Heading>
                      <Text>
                        Score: {this.state.selectedTeammateObject.userScore}
                      </Text>
                    </div>
                  }
                  onCloseComplete={() =>
                    this.setState({ teammateDialogInfoIsShown: false })
                  }
                  hasFooter={false}>
                  <img
                    style={{ width: 100, height: 100 }}
                    src="/images/anon.png"
                  />
                </Dialog>
                <br />
                <br />
                <Button
                  onClick={() => {
                    this.setState({ teammateDialogInfoIsShown: true });
                  }}
                  disabled={
                    this.state.selectedTeammateName !== "" ? false : true
                  }
                  appearance="primary"
                  intent="default">
                  Get Teammate Info
                </Button>
              </Pane>
              <Pane
                marginRight={10}
                marginLeft={10}
                elevation={2}
                paddingLeft={10}
                paddingRight={10}
                flexGrow={1}>
                <Text>Team Pane</Text>
                <br />
                <select onChange={this.onTeamDropDownSelected}>
                  <option value="default">Select Team:</option>
                  {this.props.allTeams.allTeams
                    ? this.props.allTeams.allTeams.map((object, index) => (
                      <option key={index} value={JSON.stringify(object)}>
                        {object.teamName}
                      </option>
                    ))
                    : ""}
                </select>

                <br />
                <Button
                  appearance="primary"
                  intent="success"
                  onClick={this.joinTeamClick}
                  disabled={this.state.selectedTeamName ? false : true}>
                  Join Team
                </Button>
                <br />
                <Dialog
                  isShown={this.state.teamDialogInfoIsShown}
                  title={
                    <div>
                      <Heading>Team {this.state.selectedTeamName}</Heading>
                      <Text>
                        Score: {this.state.selectedTeamObject.teamScore}
                      </Text>
                    </div>
                  }
                  // title={`Team ${
                  //   this.state.selectedTeamName
                  // }  --- Score: ${
                  //   this.state.selectedTeamObject.teamScore
                  // }`}
                  onCloseComplete={() =>
                    this.setState({ teamDialogInfoIsShown: false })
                  }
                  hasFooter={false}>
                  Team&nbsp;
                  {this.state.selectedTeamObject.teamName}
                  &nbsp;consists of:
                  <br />
                  {this.state.selectedTeamObject.users
                    ? this.state.selectedTeamObject.users.map(users => {
                      console.log("USERS: ", users);
                      return (
                        <span>
                          {users.username}
                          <br />
                        </span>
                      );
                    })
                    : "nothing"}
                  <Text>
                    Challenge 1:{" "}
                    {this.state.selectedTeamObject
                      ? this.state.selectedTeamObject.challenge1.name
                      : "nothing"}
                  </Text>
                  <br />
                  <Text>
                    Challenge 2: {this.state.selectedTeamObject.challenge2.name}
                  </Text>
                  <br />
                  <Text>
                    Challenge 3: {this.state.selectedTeamObject.challenge2.name}
                  </Text>
                </Dialog>
                <br />
                <Button
                  onClick={() => this.setState({ teamDialogInfoIsShown: true })}
                  disabled={this.state.selectedTeamName ? false : true}
                  appearance="primary">
                  Get Team Info
                </Button>
              </Pane>
              <Pane
                marginRight={10}
                marginLeft={10}
                elevation={2}
                paddingLeft={10}
                paddingRight={10}
                flexGrow={1}>
                <Text>User Pane</Text>
                <br />
                <select onChange={this.onUserDropDownSelected}>
                  <option value="default">Select User:</option>
                  {this.props.allUsers.allUsers
                    ? this.props.allUsers.allUsers.map((object, index) => (
                      <option key={index} value={JSON.stringify(object)}>
                        {object.username}
                      </option>
                    ))
                    : ""}
                </select>
                <br />
                <Button
                  appearance="primary"
                  intent="success"
                  onClick={this.bringUserToTeam}
                  disabled={this.state.selectedUserName ? false : true}>
                  Add User To Team
                </Button>

                <Dialog
                  isShown={this.state.userDialogInfoIsShown}
                  title={
                    <div>
                      <Heading>{this.state.selectedUserName}</Heading>
                      <Text>
                        Score: {this.state.selectedUserObject.userScore}
                      </Text>
                    </div>
                  }
                  onCloseComplete={() =>
                    this.setState({ userDialogInfoIsShown: false })
                  }
                  hasFooter={false}>
                  <img
                    style={{ width: 100, height: 100 }}
                    src="/images/anon.png"
                  />
                </Dialog>
                <br />
                <br />
                <Button
                  onClick={() => {
                    this.setState({ userDialogInfoIsShown: true });
                  }}
                  disabled={this.state.selectedUserName !== "" ? false : true}
                  appearance="primary"
                  intent="default">
                  Get User Info
                </Button>
              </Pane>
              <Pane
                marginRight={10}
                marginLeft={10}
                elevation={2}
                paddingLeft={10}
                paddingRight={10}
                minWidth={"30vw"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexGrow={2}>
                <a href="sexy"><img src="/images/singles.png" height="100%" width="100%" className="advert" /></a>
              </Pane>
            </Pane>
          </Pane>
        </SideSheet>

        <nav id="nav">{isAuthenticated ? userLoggedIn : logInOrRegister}</nav>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  map: state.map,
  user: state.user,
  allUsers: state.allUsers,
  allTeams: state.allTeams,
  userDB: state.userDB,
  teams: state.teams
});

export default connect(
  mapStateToProps,
  {
    logoutUser,
    clearCurrentProfile,
    updateUserLoc,
    getAllUsers,
    getAllTeams,
    joinTeam,
    getUserDB,
    getTeam,
    addUser,
    removeUser,
    loginUser,
    setCurrentUser
  }
)(Nav);

/*
*
**
***
****
*****
****
***
**
*
*
**
***
****
*****
****
***
**
*
Old Code


Old Team Drop Down Select -- Default HTML
<select onChange={this.onDropDownSelected}>
  <option value="default">Select Team:</option>
  {this.props.allTeams.allTeams
    ? this.props.allTeams.allTeams.map((object, index) => (
        <option key={index} value={JSON.stringify(object)}>
          {object.teamName}
        </option>
      ))
    : ''}
</select>





// <SelectMenu
//   isMultiSelect
//   title="Select name"
//   //options={this.state.dropDownOptions}
//   options={
//     this.props.allUsers.allUsers
//       ? this.props.allUsers.allUsers.map(label => ({
//           label,
//           value: label
//         }))
//       : this.state.dropDownOptions
//   }
//   selected={this.state.selected}
//   onSelect={item => this.setState({ selected: item.value })}
//   onDeselect={item => this.setState({ selected: false })}
// >
//   <Button>
//     <Text>{this.state.selected || 'Select name...'}</Text>
//   </Button>
// </SelectMenu> 





// {this.props.auth.user.userData
// ? this.props.auth.user.userData.team.teamName
// : ''}
// {this.props.auth.user
// ? this.props.auth.user.teamData.teamName.map(item => {
//     console.log('#### Mapping ####', item);
//     return (
//       <span>
//         {item} <br />
//       </span>
//     );
//   })
// : 'No Team'} 






<SelectMenu
  isMultiSelect
  title="Select team"
  options={
    this.props.allTeams.allTeams
      ? this.props.allTeams.allTeams.map(label => ({
          label: label.teamName,
          value: JSON.stringify(label)
        }))
      : 'Nothing To Select'
  }
  selected={this.state.teamDropdownSelected}
  onSelect={item => {
    //let team = JSON.parse(this.state.teamDropdownSelectedTeam);
    console.log('Stringified Shit: ', item.label, item.value);
    this.setState({
      teamDrodownSelected: item.label,
      teamDropdownSelectedTeamObject: item.value
    });
  }}
  onDeselect={() => this.setState({ teamDropdownSelected: null })}
>
  <Button>
    <Text>
      {this.state.teamDropdownSelected || 'Select name...'}
    </Text>
  </Button>
</SelectMenu>




<Menu>
  <Menu.OptionsGroup
    title="Teammates"
    options={
      this.props.auth.isAuthenticated == true &&
      this.props.auth.user.teamData !== null
        ? this.props.auth.user.teamData.users.map(item => {
            console.log(JSON.stringify(item));
            return {
              label: item.username,
              value: JSON.stringify(item)
            };
          })
        : 'No Teammates...sorry bro'
    }
    selected={this.state.teammateMenuSelected}
    onChange={selected =>
      this.setState({ teammateMenuSelected: selected })
    }
  />
</Menu>
<Button
  appearance="primary"
  disabled={
    this.state.teammateMenuSelected == '' ? true : false
  }
  onClick={() => this.setState({ teammateMenuSelected: '' })}
>
  UnSelect
</Button>







*/
