Rails.application.routes.draw do
  root "slider#index"
  resources :sliders, only:[:index]
end
