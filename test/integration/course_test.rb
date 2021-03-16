require 'test_helper'

class CourseTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  
  setup do
    @user = users(:rocko)
    @admin = users(:dr_hutchison)
    @jabroni = users(:filburt)
    
    @user.confirm
    @admin.confirm
    @jabroni.confirm
    
    @adams_hollow = {
      course: {
        name: "Adams Hollow",
        description: "Located in an open, dedicated park with a wide variety of terrain and challenge.",
        current_conditions: "Covered in snow! Try again next week.",
        public_availability: "public",
        schedule: "year-round",
        lat: 39.9308,
        lng: -104.8700,
        address: "Playground Parking Area, Campground Rd",
        city: "Adams County",
        state: "CO",
        zip: 80211
      }
    }
    
    @birds_nest = {
      course: {
        name: "Bird's Nest Disc Golf Park",
        description: "Lots of distance tests and open bomber shots.",
        current_conditions: "Sunny and beautiful.",
        public_availability: "public",
        schedule: "year-round",
        lat: 39.8162,
        lng: -105.2023,
        address: "West 64th Parkway",
        city: "Arvada",
        state: "CO",
        zip: 80007
      }
    }
    
    @spooky_gulch = {
      course: {
        name: "Spooky Gulch Disc Golf Experience",
        description: "Actually haunted. Play at your own risk.",
        current_conditions: "Spookier than usual",
        public_availability: "public",
        schedule: "seasonal",
        lat: 41.8162,
        lng: -102.2023,
        address: "Trapped In A Mine",
        city: "Nowhere",
        state: "CO",
        zip: 81224
      }
    }
  end
  
  test "Disc Golf Courses" do
    # Users can create courses.
    sign_in @user
    assert_difference 'Course.count', 1 do
      post '/courses', params: @adams_hollow
    end
    
    # After creating a course, it's viewable to the public.
    new_course_id = Course.last.id
    get "/courses/#{new_course_id}"
    assert_response :success
    assert_includes(response.body, @adams_hollow[:course][:description])

    # Grabbing the index returns all courses.
    sign_in @user
    post '/courses', params: @birds_nest
    sign_in @user
    post '/courses', params: @spooky_gulch
    get '/courses'
    assert_response :success
    assert_includes(response.body, @adams_hollow[:course][:name])
    assert_includes(response.body, @birds_nest[:course][:name])
    assert_includes(response.body, @spooky_gulch[:course][:name])
    
    # Course curators and weThrow admins can update a course.
    admin_conditions = "It just rained and got all muddy."
    admin_params = {
      course: {
        current_conditions: admin_conditions
      }
    }
    last_course_id = Course.last.id
    sign_in @admin
    patch "/courses/#{last_course_id}", params: admin_params
    assert_includes(response.body, admin_conditions)
    
    curator_conditions = "The sun came out and dried up all the mud."
    curator_params = {
      course: {
        current_conditions: curator_conditions
      }
    }
    sign_in @user
    patch "/courses/#{last_course_id}", params: curator_params
    assert_includes(response.body, curator_conditions)
    
    # Curators and admins can also delete a course.
    sign_in @admin
    assert_difference 'Course.count', -1 do
      delete "/courses/#{last_course_id}"
    end
    next_course_id = Course.last.id
    sign_in @user
    assert_difference 'Course.count', -1 do
      delete "/courses/#{next_course_id}"
    end
    
    # Nobody else can update or delete courses.
    jabroni_conditions = "I can't see anything over the fence."
    jabroni_params = {
      course: {
        current_conditions: jabroni_conditions
      }
    }
    last_course_id = Course.last.id
    course_conditions = Course.last.current_conditions
    sign_in @jabroni
    patch "/courses/#{last_course_id}", params: jabroni_params
    refute_equal course_conditions, jabroni_conditions
    sign_in @jabroni
    assert_no_difference 'Course.count' do
      delete "/courses/#{last_course_id}"
    end
    
    # Courses can't be created without a name, latitude and longitude.
    assert_no_difference 'Course.count' do
      name_missing_params = @adams_hollow.deep_dup
      name_missing_params[:course][:name] = ""
      sign_in @user
      post "/courses/", params: name_missing_params
    end
    assert_no_difference 'Course.count' do
      latitude_missing_params = @birds_nest.deep_dup
      latitude_missing_params[:course][:lat] = nil
      sign_in @admin
      post "/courses/", params: latitude_missing_params
    end
    assert_no_difference 'Course.count' do
      longitude_missing_params = @spooky_gulch.deep_dup
      longitude_missing_params[:course][:lng] = nil
      sign_in @jabroni
      post "/courses/", params: longitude_missing_params
    end
    
    # Course descriptions and current conditions can't be over 300 characters.
    stephen_king_description = "A whole lot of words! " * 100
    stephen_king_params = {
      course: {
        description: stephen_king_description
      }
    }
    sign_in @user
    patch "/courses/#{last_course_id}", params: stephen_king_params
    course_description = Course.last.description
    refute_equal course_description, stephen_king_description
    
    stephen_king_conditions = "My typewriter ribbon could go around the moon twice! " * 100
    stephen_king_params = {
      course: {
        current_conditions: stephen_king_conditions
      }
    }
    sign_in @user
    patch "/courses/#{last_course_id}", params: stephen_king_params
    course_conditions = Course.last.current_conditions
    refute_equal course_conditions, stephen_king_conditions
  end
end
