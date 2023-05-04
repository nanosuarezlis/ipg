import '@testing-library/jest-dom';
import React from 'react';
import { render, act, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserContext, UserProvider } from '../../src/client/context/UserContext';

test('renders the UserProvider and has access to the UserContext', () => {
    render(
      <UserProvider>
        <UserContext.Consumer>
          {value => <div>userApiId: {value.userApiId}</div>}
        </UserContext.Consumer>
      </UserProvider>
    );
  
    expect(screen.getByText(/userApiId/)).toBeInTheDocument();
});

test('initial state is set correctly', () => {
    render(
        <UserProvider>
        <UserContext.Consumer>
            {value => (
                <div>
                    <div>userId: {value.userId}</div>
                    <div>userApiId: {value.userApiId}</div>
                </div>
            )}
        </UserContext.Consumer>
        </UserProvider>
    );

    expect(screen.getByText(/userId:/)).toBeInTheDocument();
    expect(screen.getByText(/userApiId:/)).toBeInTheDocument();
});

test('setUserData updates the user context correctly', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ guest_session_id: 'abc123' })
    });
  
    localStorage.setItem('userId', '123');
    localStorage.setItem('api_id_123', 'xyz789');
  
    const { container } = render(
      <UserProvider>
        <UserContext.Consumer>
          {value => (
            <div>
              <div>{value.userId}</div>
              <div>{value.userApiId}</div>
              <button
                id="set-user-data"
                onClick={() => {
                  value.setUserData();
                }}
              />
            </div>
          )}
        </UserContext.Consumer>
      </UserProvider>
    );
  
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
      // Wait for the resolved Promise of fetch to complete before calling setUserData
      await Promise.resolve();
      const response = await global.fetch('http://example.com');
      const data = await response.json();
      const setUserData = container.querySelector('#set-user-data');
      
      if (setUserData !== null) {
        fireEvent.click(setUserData, { data });
      }
    });
  
    await waitFor(() => {
        const abcElements = screen.queryAllByText("123");
        expect(abcElements.length).toBeGreaterThan(0);
        const abc123Elements = screen.queryAllByText("xyz789");
        expect(abc123Elements.length).toBeGreaterThan(0);
    });
});
  
  

afterEach(() => {
    localStorage.clear();
});
    
  
  