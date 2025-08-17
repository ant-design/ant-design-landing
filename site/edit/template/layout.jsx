import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { getNewHref } from '../../utils';
import { mapStateToProps, logIn } from '../../shared/utils';
import * as actions from '../../shared/redux/actions';

import NewFileButton from './components/NavController/NewFileButton';
import NavController from './components/NavController';
import SideMenu from './components/SideMenu';
import EditInfluence from './components/EditInfluence';
import Iframe from './components/Iframe';
import EditStageController from './components/EditStageController';
import EditListController from './components/EditListController';

class Layout extends React.PureComponent {
  state = {
    password: '',
    error: '',
    loading: false,
  }

  constructor(props) {
    super(props);
    const { dispatch } = props;
    dispatch(actions.getUserData());
  }

  componentDidMount() {
    // Notification will be replaced with custom component later
  }

  onLogin = (e) => {
    e.preventDefault();
    const { templateData, dispatch } = this.props;
    const id = templateData.data.user.userId;
    const { password } = this.state;
    
    this.setState({ loading: true }, () => {
      logIn(password, id, (succeeded) => {
        if (succeeded) {
          dispatch(actions.setUserData(true));
          // Replace message.success with custom notification
        } else {
          this.setState({ error: 'Password error.' });
        }
        this.setState({ loading: false });
      });
    });
  }

  render() {
    const { templateData, userIsLogin, intl } = this.props;

    if (!templateData.data) {
      return (
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      );
    }
    
    if (templateData.data.user && templateData.data.user.userId && 
        !templateData.data.user.delete && !userIsLogin) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" key="1">
          <div className={`bg-white p-8 rounded-lg shadow-md w-full max-w-md ${
            this.state.error ? 'border border-red-500' : ''
          }`}>
            <a 
              href={getNewHref('7111', null, true)} 
              target="_blank" 
              className="flex items-center justify-center mb-6"
            >
              <img
                src="https://gw.alipayobjects.com/zos/rmsportal/SVDdpZEbAlWBFuRGIIIL.svg"
                alt="logo"
                className="w-10 h-10"
              />
            </a>
            
            <form onSubmit={this.onLogin}>
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-gray-700">
                  <FormattedMessage id="app.login.title" />
                </p>
              </div>
              
              <div className="mb-4">
                <div className="relative">
                  <input
                    type="password"
                    placeholder={intl.formatMessage({ id: 'app.login.password' })}
                    value={this.state.password}
                    onChange={(e) => this.setState({ 
                      password: e.target.value,
                      error: ''
                    })}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      this.state.error ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {this.state.error && (
                    <p className="text-red-500 text-sm mt-1">{this.state.error}</p>
                  )}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={this.state.loading || this.state.password.length < 6}
                className={`w-full py-2 px-4 rounded-lg font-medium ${
                  this.state.loading || this.state.password.length < 6
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {this.state.loading ? (
                  <span>Logging in...</span>
                ) : (
                  <FormattedMessage id="app.common.ok" />
                )}
              </button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="flex items-center text-gray-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <FormattedMessage id="app.login.noPassword" />
              </p>
              <NewFileButton>
                <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                  <FormattedMessage id="app.login.new" />
                </button>
              </NewFileButton>
            </div>
          </div>
        </div>
      );
    }
    
    return (
      <div className="flex h-screen bg-gray-50" key="2">
        {/* Left Panel - Navigation & Workspace */}
        <div className="flex flex-col flex-1">
          <NavController {...this.props} />
          
          <div className="flex flex-1 overflow-hidden">
            <SideMenu {...this.props} />
            
            <div className="flex flex-col flex-1">
              <EditInfluence {...this.props} />
              
              <div className="flex-1 relative">
                <Iframe className="absolute inset-0 w-full h-full" />
              </div>
              
              <EditStageController {...this.props} />
            </div>
          </div>
        </div>
        
        {/* Right Panel - Properties/Components */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <EditListController {...this.props} />
        </div>
      </div>
    );
  }
}

export default injectIntl(connect(mapStateToProps)(Layout));