require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder
  skip_before_action :verify_authenticity_token

  respond_to :json
end
