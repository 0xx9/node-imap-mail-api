# node-imap-mail-api

This Node.js script API checks an IMAP mailbox for any emails matching a specified email address.

## Usage

1. **Change Login Details:**
   Update the login details in `imapService.js`.

2. **Run the Server:**
   Start the server by running:
   
This will start the server on `localhost:5555`.

4. **Search for Emails:**
Visit `http://localhost:5555/{email}` in your browser or make a GET request to search for emails.

## Quick Start

1. Update `imapService.js` with your IMAP server's login details.

2. Start the server:


3. Visit `http://localhost:5555/{email}` in your web browser to search for emails for a specific email address.

## Files

- **index.js**: Entry point of the application.
- **imapService.js**: Contains the IMAP mail service configuration. Update your login details here.
- **README.md**: This file, providing instructions and information about the project.

## Example

Assuming you've updated the login details in `imapService.js`, to check for emails sent to `example@example.com`, visit `http://localhost:5555/example@example.com`.

## Note

For further customization or details, refer to the respective files in this project.

Thanks you can contact with me via instgaram : @_0x0 .
