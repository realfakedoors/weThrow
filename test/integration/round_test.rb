require 'test_helper'

class RoundTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  
  setup do
    @user = users(:rocko)
    @admin = users(:dr_hutchison)
    @course = courses(:grizzly_gulch)
    @course.curator_id = @user.id
    
    @user.confirm
    @admin.confirm
  end
  
  test "Rounds" do
    round_params = {
      round: {
        course_id: @course.id,
        user_id: @user.id,
        layout_name: "Insanity VII",
        recorded_holes_attributes: [
          {name: "1", par: 3, distance: 300, score: 3},
          {name: "2", par: 4, distance: 750, score: 4},
          {name: "3", par: 5, distance: 1200, score: 4},
          {name: "4", par: 3, distance: 280, score: 2},
          {name: "5", par: 5, distance: 900, score: 4},
          {name: "6", par: 3, distance: 270, score: 3},
          {name: "7", par: 4, distance: 480, score: 4},
        ]
      }
    }
    
    # Users can successfully record their rounds.
    assert_difference "Round.count", 1 do
      sign_in @user
      post '/api/rounds', params: round_params
    end
    
    # Rounds belong to users and courses.
    @new_round = Round.last
    assert_equal @new_round.layout_name, "Insanity VII"
    assert_equal @new_round.user, @user
    assert_equal @new_round.course, @course
    
    # Users can't record a round if there's any missing hole info.
    missing_score_params = round_params.deep_dup
    missing_score_params[:round][:recorded_holes_attributes].first[:score] = nil
    assert_no_difference "Round.count" do
      sign_in @user
      post '/api/rounds', params: missing_score_params
    end
    missing_par_params = round_params.deep_dup
    missing_par_params[:round][:recorded_holes_attributes].first[:par] = nil
    assert_no_difference "Round.count" do
      sign_in @user
      post '/api/rounds', params: missing_par_params
    end
    missing_distance_params = round_params.deep_dup
    missing_distance_params[:round][:recorded_holes_attributes].first[:distance] = nil
    assert_no_difference "Round.count" do
      sign_in @user
      post '/api/rounds', params: missing_distance_params
    end
    
    # Rounds have a total_distance, total_par and score, sums of the round's recorded hole stats.
    assert @new_round.total_distance > 0
    assert @new_round.total_par > 0
    assert @new_round.score > 0
    
    # A course only shows its top 10 rounds.
    (10).times do
      sign_in @user
      post '/api/rounds', params: round_params
    end
    assert Round.count > 10
    awful_round_params = round_params.deep_dup
    awful_round_params[:round][:recorded_holes_attributes].map{|hole| hole[:score] = 10}
    sign_in @user
    post '/api/rounds', params: awful_round_params
    get "/api/courses/#{@course.id}"
    refute_includes(response.body, "100")
    
    # These numbers are zero if there's no recorded hole stats.
    holeless_params = round_params.deep_dup
    holeless_params[:round][:recorded_holes_attributes] = []
    sign_in @user
    post '/api/rounds', params: holeless_params
    @holeless_round = Round.last
    assert_equal @holeless_round.total_distance, 0
    assert_equal @holeless_round.total_par, 0
    assert_equal @holeless_round.score, 0
    
    # Users can view an index of their rounds.
    sign_in @user
    get "/api/rounds"
    assert_response :success
    assert_includes(response.body, @new_round.layout_name)
    assert_includes(response.body, @holeless_round.layout_name)
    
    # Users can delete their own rounds.
    assert_difference 'Round.count', -1 do
      sign_in @user
      delete "/api/rounds/#{@holeless_round.id}"
    end
    assert_response :no_content
    
    # Admins can delete anyone else's rounds.
    assert_difference 'Round.count', -1 do
      sign_in @admin
      delete "/api/rounds/#{@new_round.id}"
    end
    assert_response :no_content
  end
end
