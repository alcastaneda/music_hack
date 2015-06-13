class User < ActiveRecord::Base
  client = Soundcloud.new(:client_id => 'my-client-id')
end
