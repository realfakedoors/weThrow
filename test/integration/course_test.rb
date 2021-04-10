require 'test_helper'

class CourseTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  require_relative 'course_params.rb'
  
  setup do
    @user = users(:rocko)
    @admin = users(:dr_hutchison)
    @jabroni = users(:filburt)
    
    @user.confirm
    @admin.confirm
    @jabroni.confirm
    
    @adams_hollow = CourseParams::ADAMS_HOLLOW
    @birds_nest = CourseParams::BIRDS_NEST
    @spooky_gulch = CourseParams::SPOOKY_GULCH
    
    [@adams_hollow, @birds_nest, @spooky_gulch].each do |course|
      course[:course][:photos_attributes].map{|photo| photo[:uploader_id] = @user.id}
    end
  end
  
  test "Disc Golf Courses" do
    # Users can create courses.
    sign_in @user
    assert_difference 'Course.count', 1 do
      post '/api/courses', params: @adams_hollow
    end
    
    # After creating a course, it's viewable to the public.
    new_course_id = Course.last.id
    get "/api/courses/#{new_course_id}"
    assert_response :success
    assert_includes(response.body, @adams_hollow[:course][:description])
    assert_includes(response.body, @adams_hollow[:course][:photos_attributes][0][:url])
    assert_includes(response.body, @adams_hollow[:course][:hole_layouts_attributes][0][:name])
    assert_includes(response.body, @adams_hollow[:course][:hole_layouts_attributes][0][:holes_attributes][0][:distance].to_s)

    # Grabbing the index returns all courses.
    sign_in @user
    post '/api/courses', params: @birds_nest
    sign_in @user
    post '/api/courses', params: @spooky_gulch
    get '/api/courses'
    assert_response :success
    assert_includes(response.body, @adams_hollow[:course][:name])
    assert_includes(response.body, @birds_nest[:course][:name])
    assert_includes(response.body, @spooky_gulch[:course][:name])
    
    # Getting search_courses with search params returns matching courses.
    get '/api/search_courses', params: { search: "Adams Hollow"}
    assert_response :success
    assert_includes(response.body, @adams_hollow[:course][:name])
    # Course search is case insensitive.
    get '/api/search_courses', params: { search: "sPoOky GuLcH disc golf EXPERIENCE"}
    assert_response :success
    assert_includes(response.body, @spooky_gulch[:course][:name])
    # Course search matches a partial string.
    get '/api/search_courses', params: { search: "sPoOky"}
    assert_response :success
    assert_includes(response.body, @spooky_gulch[:course][:name])
    get '/api/search_courses', params: { search: "bird"}
    assert_response :success
    assert_includes(response.body, @birds_nest[:course][:name])
    
    # Getting my_courses as a signed-in user returns all the courses a user has created.
    sign_in @user
    get '/api/my_courses'
    assert_response :success
    assert_includes(response.body, @adams_hollow[:course][:name])
    assert_includes(response.body, @spooky_gulch[:course][:name])
    assert_includes(response.body, @birds_nest[:course][:name])
    # If you're not signed in, you can't view my_courses.
    get '/api/my_courses'
    assert_response :redirect
    
    # Course curators and weThrow admins can update a course.
    admin_conditions = "It just rained and got all muddy."
    admin_params = {
      course: {
        current_conditions: admin_conditions
      }
    }
    last_course_id = Course.last.id
    sign_in @admin
    patch "/api/courses/#{last_course_id}", params: admin_params
    assert_includes(response.body, admin_conditions)
    
    curator_conditions = "The sun came out and dried up all the mud."
    curator_params = {
      course: {
        current_conditions: curator_conditions
      }
    }
    sign_in @user
    patch "/api/courses/#{last_course_id}", params: curator_params
    assert_includes(response.body, curator_conditions)
    
    # Curators and admins can also delete a course.
    sign_in @admin
    assert_difference 'Course.count', -1 do
      delete "/api/courses/#{last_course_id}"
    end
    next_course_id = Course.last.id
    sign_in @user
    assert_difference 'Course.count', -1 do
      delete "/api/courses/#{next_course_id}"
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
    patch "/api/courses/#{last_course_id}", params: jabroni_params
    refute_equal course_conditions, jabroni_conditions
    sign_in @jabroni
    assert_no_difference 'Course.count' do
      delete "/api/courses/#{last_course_id}"
    end
    
    # Courses can't be created without a name and a city.
    assert_no_difference 'Course.count' do
      name_missing_params = @adams_hollow.deep_dup
      name_missing_params[:course][:name] = ""
      sign_in @user
      post "/api/courses/", params: name_missing_params
    end
    assert_no_difference 'Course.count' do
      city_missing_params = @adams_hollow.deep_dup
      city_missing_params[:course][:city] = ""
      sign_in @user
      post "/api/courses/", params: city_missing_params
    end
    
    # Course descriptions can't be over 600 characters.
    stephen_king_description = "A whole lot of words! " * 100
    stephen_king_params = {
      course: {
        description: stephen_king_description
      }
    }
    sign_in @user
    patch "/api/courses/#{last_course_id}", params: stephen_king_params
    course_description = Course.last.description
    refute_equal course_description, stephen_king_description
    
    # Courses can only have 20 or fewer photos.
    a_lot_of_photos = Array.new(23).map{{url: "https://coolphotos.com/photo24", uploader_id: @user.id}}
    too_many_photos_params = {
      course: {
        photos_attributes: a_lot_of_photos
      }
    }
    sign_in @user
    assert_no_difference 'Course.last.photos.count' do
      patch "/api/courses/#{last_course_id}", params: too_many_photos_params
    end
    
    # Hole layouts must have a name.
    empty_layout_name = ""
    no_name_layout_params = {
      course: {
        hole_layouts_attributes: [
          {
            name: empty_layout_name
          }
        ]
      }
    }
    sign_in @user
    patch "/api/courses/#{last_course_id}", params: no_name_layout_params
    assert_equal Course.last.hole_layouts.count, 0
    
    # Hole layouts can have 99 holes max.
    an_impossibly_large_course = Array.new(101).map.with_index(1){|e, i| {name: i.to_s, par: 3, distance: 305}}
    impossibly_large_course_params = {
      course: {
        hole_layouts_attributes: [
          {name: "Huge Course",
            holes_attributes: an_impossibly_large_course}
          ]
      }
    }
    sign_in @user
    assert_no_difference 'Course.last.hole_layouts.count' do
      patch "/api/courses/#{last_course_id}", params: impossibly_large_course_params
    end
    
    # Holes must have names.
    hole_without_a_name = {par: 3, distance: 999}
    no_name_hole_params = {
      course: {
        hole_layouts_attributes: [
          name: "new layout that doesn't believe in hole names",
          holes_attributes: [
            hole_without_a_name
          ]
        ]
      }
    }
    sign_in @user
    patch "/api/courses/#{last_course_id}", params: no_name_hole_params
    assert_not Hole.find_by(distance: hole_without_a_name[:distance])
    
    # Hole names can't be longer than 3 characters.
    hole_with_a_long_name = {name: "cool hole here, pretty easy", par: 5, distance: 250}
    long_name_hole_params = {
      course: {
        hole_layouts_attributes: [
          name: "hole_name_is_out_of_hand",
          holes_attributes: [
            hole_with_a_long_name
          ]
        ]
      }
    }
    sign_in @user
    patch "/api/courses/#{last_course_id}", params: long_name_hole_params
    assert_not Hole.find_by(name: hole_with_a_long_name[:name])
    
    # Holes must have pars.
    hole_without_a_par = {name: "Whoops, no par", distance: 711}
    no_par_hole_params = {
      course: {
        hole_layouts_attributes: [
          name: "new layout that doesn't believe in hole names",
          holes_attributes: [
            hole_without_a_par
          ]
        ]
      }
    }
    sign_in @user
    patch "/api/courses/#{last_course_id}", params: no_par_hole_params
    assert_not Hole.find_by(name: hole_without_a_par[:name])
  end
end
