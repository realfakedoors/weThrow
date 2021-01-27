class ApplicationResponder < ActionController::Responder
  include Responders::FlashResponder
  include Responders::HttpCacheResponder

  protected

  def json_resource_errors
    {
      success: false,
      errors: resource.errors
    }
  end
end
