new Vue({
    el: '#app',
    data: {
        contacts: [],
        currentContact: {
            id: null,
            name: '',
            phone: ''
        },
        isEditing: false
    },
    mounted() {
        // Load contacts when the app starts
        this.fetchContacts();
    },
    methods: {
        // Fetch all contacts from the backend
        fetchContacts() {
        
            fetch('http://8.148.231.135:5000/contacts')
                .then(response => response.json())
                .then(data => {
                    this.contacts = data;
                })
                .catch(error => console.error('Error fetching contacts:', error));
        },
        
        // Save a new contact or update an existing one
        saveContact() {
            if (this.isEditing) {
                // Update existing contact
                
                fetch(`http://8.148.231.135:5000/contacts/${this.currentContact.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.currentContact)
                })
                .then(() => {
                    this.fetchContacts();
                    this.resetForm();
                })
                .catch(error => console.error('Error updating contact:', error));
            } else {
                // Add new contact
              
                fetch('http://8.148.231.135:5000/contacts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: this.currentContact.name,
                        phone: this.currentContact.phone
                    })
                })
                .then(() => {
                    this.fetchContacts();
                    this.resetForm();
                })
                .catch(error => console.error('Error adding contact:', error));
            }
        },
        
        // Prepare form for editing a contact
        editContact(contact) {
            this.currentContact = { ...contact };
            this.isEditing = true;
        },
        
        // Delete a contact
        deleteContact(id) {
            if (confirm('Are you sure you want to delete this contact?')) {
               
                fetch(`http://8.148.231.135:5000/contacts/${id}`, {
                    method: 'DELETE'
                })
                .then(() => {
                    this.fetchContacts();
                })
                .catch(error => console.error('Error deleting contact:', error));
            }
        },
        
        // Reset the form
        resetForm() {
            this.currentContact = {
                id: null,
                name: '',
                phone: ''
            };
            this.isEditing = false;
        }
    }
});

