# Homepage (Root path)
get '/' do
  erb :index
end

get '/contacts.json' do
  @contacts = Contact.all
  json @contacts
end

post '/contacts/new' do
  Contact.create(first_name: params['first_name'],last_name: params['last_name'], email: params['email'], phone: params['phone'] )
end


