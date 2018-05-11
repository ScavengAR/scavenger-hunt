import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';

import { login } from '../store/auth';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error:
        '' ||
        (this.props.navigation.state.params &&
          this.props.navigation.state.params.error)
    };
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeEmail(value) {
    this.setState({ email: value });
  }

  handleChangePassword(value) {
    this.setState({ password: value });
  }

  handleSubmit() {
    const email = this.state.email;
    const password = this.state.password;
    this.props.login(
      {
        email,
        password
      },
      this.props.navigation
    );
    // clear the state after login for security
    this.setState({
      email: '',
      password: '',
      error: ''
    });
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="position" style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Log in to get playing!</Text>
          <Text style={styles.error}>{this.state.error}</Text>
          <Text style={styles.textLabel}>Email</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
            placeholder="Enter email here"
            placeholderTextColor="white"
            value={this.state.email}
            onChangeText={email => this.handleChangeEmail(email)}
          />
          <Text style={styles.textLabel}>Password</Text>
          <TextInput
            style={styles.textInput}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            maxLength={15}
            placeholder="Enter password here"
            placeholderTextColor="white"
            value={this.state.password}
            onChangeText={password => this.handleChangePassword(password)}
          />
          <Button
            rounded
            raised
            style={styles.button}
            backgroundColor="white"
            color="gray"
            title="Login"
            onPress={this.handleSubmit}
          />
          <Button
            rounded
            raised
            style={{ width: 280, alignSelf: 'center', marginTop: 15 }}
            backgroundColor="gray"
            color="white"
            title="New to Banana Hunt? Sign Up"
            onPress={() => {
              // this.props.navigation.navigate('Signup');
              this.setState({
                email: '',
                password: '',
                error: ''
              });
            }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: (credentials, navigation) => dispatch(login(credentials, navigation))
});

export default connect(null, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E96B63',
    paddingHorizontal: 5,
    flex: 1
  },
  title: {
    fontSize: 40,
    color: 'white',
    alignSelf: 'center',
    marginTop: 20,
    padding: 40,
    paddingBottom: 0,
    textAlign: 'center'
  },
  textLabel: {
    fontSize: 20,
    marginTop: 10,
    padding: 10,
    color: 'white'
  },
  textInput: {
    height: 40,
    width: 300,
    margin: 10,
    paddingLeft: 10,
    alignSelf: 'center',
    color: 'tomato',
    fontSize: 15,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: 'white'
  },
  button: {
    width: 150,
    marginTop: 20,
    alignSelf: 'center'
  },
  error: {
    fontSize: 15,
    color: 'blue',
    marginVertical: 0,
    paddingLeft: 10,
    fontWeight: 'bold'
  }
});
