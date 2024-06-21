import React, { Component } from 'react';
import axios from 'axios';
import './Applications.scss';

class Applications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      isApplications: true
    };
  }

  componentDidMount() {
    this.allApplications();
  }

  toggleApplications = () => {
    const { isApplications } = this.state;
    this.setState({
      isApplications: !isApplications
    });
    document.body.style.overflow = !isApplications ? 'hidden' : '';
  }

  allApplications = async () => {
    try {
      const response = await axios.get('http://localhost:3000/contact');
      if (response.status === 200 || response.status === 201) {
        this.setState({ contacts: response.data.contacts });
      } else {
        console.log('Unexpected status code:', response.status);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  render() {
    const { isApplications, contacts } = this.state;
    return (
      <>
        {isApplications && (
          <div className="applications">
            <div className="applications__window">
              <button onClick={this.toggleApplications} className="applications__window__close">×</button>
              <h2 className="applications__window__title">Заявки на связь</h2>
              <div className="applications__window__wrapper">
                {contacts.length > 0 ? (
                  contacts.map(contact => (
                    <div key={contact.id} className="applications__window__wrapper__contact">
                      <div className="applications__window__wrapper__contact__id">Id: {contact.id}</div>
                      <div className="applications__window__wrapper__contact__name">Имя: {contact.name}</div>
                      <div className="applications__window__wrapper__contact__email">Email: {contact.email}</div>
                      <div className="applications__window__wrapper__contact__tel">Телефон: {contact.tel}</div>
                    </div>
                  ))
                ) : (
                  <div className="applications__window__empty">Пока что нет заявок</div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Applications;
